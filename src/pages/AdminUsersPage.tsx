import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, Trash2, User as UserIcon } from 'lucide-react'
import { api } from '../lib/api'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'

interface AdminUser {
  id: number
  username: string
  email: string | null
  role: string
  created_at: string
  canningCount: number
  inventoryCount: number
}

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)

  const loadUsers = async () => {
    try {
      const data = await api.getAdminUsers()
      setUsers(data)
    } catch (err) {
      console.error('Failed to load users', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleRoleChange = async (id: number, role: string) => {
    try {
      await api.updateAdminUser(id, role)
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
    } catch (err) {
      console.error('Failed to update role', err)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await api.deleteAdminUser(deleteTarget.id)
      setUsers(prev => prev.filter(u => u.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (err) {
      console.error('Failed to delete user', err)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8">Завантаження...</div>
  }

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/admin/dashboard" className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 mb-4">
          <ArrowLeft size={16} />
          Назад до панелі
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-komora-50 flex items-center justify-center">
            <Users size={20} className="text-komora-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800">Користувачі</h1>
            <p className="text-sm text-stone-500">{users.length} користувачів</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase">Користувач</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase">Роль</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-stone-500 uppercase hidden sm:table-cell">Закрутки</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-stone-500 uppercase hidden sm:table-cell">Запаси</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase hidden sm:table-cell">Дата</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <UserIcon size={16} className="text-stone-500" />
                      </div>
                      <span className="font-medium text-sm text-stone-800">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-500 hidden sm:table-cell">{user.email || '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="text-xs font-medium px-2 py-1 rounded-lg border border-stone-200 bg-white outline-none focus:ring-1 focus:ring-komora-500"
                    >
                      <option value="user">Користувач</option>
                      <option value="admin">Адмін</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-stone-600 hidden sm:table-cell">{user.canningCount}</td>
                  <td className="px-4 py-3 text-center text-sm text-stone-600 hidden sm:table-cell">{user.inventoryCount}</td>
                  <td className="px-4 py-3 text-xs text-stone-400 hidden sm:table-cell">
                    {new Date(user.created_at).toLocaleDateString('uk-UA')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDeleteTarget(user)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          title="Видалити користувача?"
        >
          <div className="space-y-4">
            <p className="text-sm text-stone-600">
              Ви впевнені, що хочете видалити користувача <b>{deleteTarget?.username}</b>?
              Всі його дані (закрутки, запаси) будуть видалені назавжди.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Скасувати</Button>
              <Button variant="danger" onClick={handleDelete}>Видалити</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
