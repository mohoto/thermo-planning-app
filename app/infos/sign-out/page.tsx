import React from 'react'
import { signOut } from '@/app/login/actions';

type Props = {}

const SignOut = (props: Props) => {

  return (
    <div className="justify-center w-full px-4 my-2 items-center-">
      <h3 className="text-2xl text-center font-medium mt-20 px-8">Se déconnecter de l'application</h3>
      <form action={signOut} className="flex items-center gap-2">
              <i className="bi bi-box-arrow-in-right"></i>
              <button className="w-full mt-7 bg-nest-orange">Déconnexion</button>
        </form>
    </div>
  )
}

export default SignOut