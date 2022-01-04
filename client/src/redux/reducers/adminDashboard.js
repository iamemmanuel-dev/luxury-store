const dashboardState = {
  productsCount: 0,
  ordersCount: 0,
  completedOrdersCount: 0,
  pendingOrdersCount: 0,
}

export const populateDashboard = () => async dispatch => {}

const dashboardReducer = (state = dashboardState, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}

export default dashboardReducer
