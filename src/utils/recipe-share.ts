import type { Recipe } from '../types'

export function encodeRecipeToUrl(recipe: Recipe): string {
  const compact = {
    n: recipe.name,
    c: recipe.categoryId,
    d: recipe.description,
    i: recipe.ingredients.map((ing) => ({
      n: ing.name,
      a: ing.amount,
      u: ing.unit,
      p: ing.productId,
    })),
    s: recipe.steps,
    bj: recipe.baseJars,
    bs: recipe.baseJarSize,
    pt: recipe.prepTime,
    ct: recipe.cookTime,
    diff: recipe.difficulty,
    t: recipe.tips,
    pids: recipe.productIds,
  }
  const json = JSON.stringify(compact)
  const encoded = btoa(encodeURIComponent(json))
  return `${window.location.origin}/app/recipes/import?data=${encoded}`
}

export function decodeRecipeFromUrl(data: string): Recipe | null {
  try {
    const json = decodeURIComponent(atob(data))
    const compact = JSON.parse(json)
    return {
      id: `imported-${Date.now()}`,
      name: compact.n,
      categoryId: compact.c,
      description: compact.d || '',
      ingredients: (compact.i || []).map((ing: any) => ({
        name: ing.n,
        amount: ing.a,
        unit: ing.u,
        productId: ing.p,
      })),
      steps: compact.s || [],
      baseJars: compact.bj || 1,
      baseJarSize: compact.bs || 1,
      prepTime: compact.pt,
      cookTime: compact.ct,
      difficulty: compact.diff || 'easy',
      tips: compact.t,
      isBuiltIn: false,
      productIds: compact.pids || [],
      createdAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export async function shareRecipe(recipe: Recipe): Promise<void> {
  const url = encodeRecipeToUrl(recipe)
  if (navigator.share) {
    await navigator.share({
      title: `Рецепт: ${recipe.name}`,
      text: `Поділюся рецептом закрутки: ${recipe.name}`,
      url,
    })
  } else {
    await navigator.clipboard.writeText(url)
    alert('Посилання на рецепт скопійовано в буфер обміну!')
  }
}
