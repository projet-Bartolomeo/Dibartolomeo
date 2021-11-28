import { user } from '../model/User'

export const state = () => ({
    user
})

export const actions = {
    async getAllStudent(){
        const results = await this.$fire.firestore.collection('user').where('type', '==', 'student').get();
        return results._delegate.docs;

    }
}