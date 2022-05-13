export default function ({ store, redirect, route }) {

    const pageType = route.fullPath.split("/")[1]
    const userType = store.state.user.connected.type

    if (!store.state.user.connected.id) {
        return redirect('/authentification/login')
    }

    if (userType === "student" && pageType === "professor") {
        return redirect(`/student/lesson/planning`)
    }
    if (userType === "professor" && pageType === "student") {
        return redirect(`/professor/lesson/planning`)
    }
}