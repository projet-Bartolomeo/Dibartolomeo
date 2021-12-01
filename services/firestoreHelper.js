export function readQuerySnapshot(querySnapshot) {
    return querySnapshot.docs.map(documentSnapshot => {
        return documentSnapshot.data()
    })
}
