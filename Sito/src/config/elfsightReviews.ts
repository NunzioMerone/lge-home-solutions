const widgetId = import.meta.env.VITE_ELFSIGHT_REVIEWS_WIDGET_ID?.trim()
const widgetIdPattern = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i

export const elfsightReviewsWidgetId =
  import.meta.env.DEV && widgetId && widgetIdPattern.test(widgetId) ? widgetId : undefined
