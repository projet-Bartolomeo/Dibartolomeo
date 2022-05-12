export default function ({ store, redirect, route }) {

    const pageType = route.fullPath.split("/")[1]
    const userType = store.state.user.connected.type
    const isVisitor = !store.state.user.connected.id
    const isNotOnLoginPage = route.path !== '/authentification/login'
    const isNotOnAuthorizedPage = userType !== pageType

    if (isVisitor && isNotOnLoginPage) {
        return redirect('/authentification/login')
    }

    if (!isVisitor && isNotOnAuthorizedPage) {
        return redirect(`/${userType}/lesson/planning`)
    }
}
