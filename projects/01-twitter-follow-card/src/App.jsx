import './App.css'
import { TwitterFolloCard } from './TwitterFollowCard'

export default function App () {
  const users = [
    {
      userName: 'jmcamposdev',
      name: 'José María Campos',
      isFollowing: true
    },
    {
      userName: 'hoxuro',
      name: 'Heriberto',
      isFollowing: true
    },
    {
      userName: 'hjimenezdev',
      name: 'Hugo Jiménez',
      isFollowing: false
    }
  ]
  return (
    <section className='card-container'>
      {users.map((user) => {
        const { userName, name, isFollowing } = user
        return (
          <TwitterFolloCard
            key={userName}
            userName={userName}
            name={name}
            initialIsFollowing={isFollowing}
          />
        )
      })}
    </section>
  )
}
