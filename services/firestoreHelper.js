export function readQuerySnapshot(querySnapshot) {
    return querySnapshot.docs.map(documentSnapshot => {
        const document = documentSnapshot.data();
        document.id = documentSnapshot.id;
        return document
    })
}

export function generateRandomId() {
    return `${(new Date().getTime() * Math.random()).toString()}`
}
