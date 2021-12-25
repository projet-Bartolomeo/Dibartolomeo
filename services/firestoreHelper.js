export function readQuerySnapshot(querySnapshot) {
    return querySnapshot.docs.map(documentSnapshot => {
        const document = documentSnapshot.data();
        document.id = documentSnapshot.id;
        return document
    })
}

export function generateRandomId() {
    return `dibartolomeo${(new Date().getTime() * Math.random()).toString()}`
}
