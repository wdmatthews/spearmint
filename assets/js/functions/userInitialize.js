import nameValidation from '@/assets/js/validation/name.js'

export default async function (realmApp, name) {
  if (typeof name !== 'string' || name.length === 0 || name.length > nameValidation.maxLength) { return }
  
  const mongodb = realmApp.currentUser.mongoClient('mongodb-atlas')
  const usersCollection = mongodb.db('spearmint').collection('users')
  
  try {
    await usersCollection.updateOne(
      { userId: realmApp.currentUser.id },
      { $set: { userId: realmApp.currentUser.id, name } },
      { upsert: true },
    )
    
    await realmApp.currentUser.refreshCustomData()
  } catch (error) {
    console.log('Error setting user\'s name: ', error)
  }
}
