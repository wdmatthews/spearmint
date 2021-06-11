import nameValidation from '@/assets/js/validation/name.js'

export default async function (realmApp, name) {
  if (typeof name !== 'string' || name.length === 0
    || name.length > nameValidation.maxLength) { return false }
  
  const mongodb = realmApp.currentUser.mongoClient('mongodb-atlas')
  const usersCollection = mongodb.db('spearmint').collection('users')
  
  try {
    await usersCollection.updateOne(
      { userId: realmApp.currentUser.id },
      { $set: { name } },
    )
    
    await realmApp.currentUser.refreshCustomData()
    return true
  } catch (error) {
    console.log('Error setting user\'s name: ', error)
    return false
  }
}
