import { login, signup } from './actions'

import { Input } from "@/components/ui/input"
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {

    const supabase = createClient()

    const { data: { user }, error } = await supabase.auth.getUser()
    if (user) {
        redirect('/')
    }

    return (
        <div className="px-6 mt-20">
            <div className="w-full">
                <div>
                    <h3 className="text-center text-xl mb-12">Connexion</h3>
                </div>
                <div>
                    <form action={login} className="space-y-8">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <Input id="email" className="h-12" name="email" type="email" required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <Input id="password" className="h-12" name="password" type="password" required />
                        </div>
                        <button className="bg-nest-orange px-4 py-3 text-white w-full rounded-lg hover:bg-orange-600" formAction={login}>Connexion</button>
                    </form>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}