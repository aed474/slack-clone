import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {SignInFlow} from "@/features/auth/types";
import {useState} from "react";
import {TriangleAlert} from "lucide-react";
import {useAuthActions} from "@convex-dev/auth/react";
import {PasswordInput} from "@/features/auth/components/password-input";

interface SignUpCardProps {
    setState: (state:SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const {signIn} = useAuthActions()

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    const [pending,setPending] = useState(false);
    const [error,setError] = useState("");

    const onPasswordSignUp = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setError("Passwords do not match")
            return
        }

        setPending(true)
        signIn("password", {name,email,password,flow:"signUp"}).catch(()=> {setError("Something went wrong")}).finally(()=>{setPending(false)})
    }

    const onProviderSignUp = (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => {setPending(false)})
    }

    return (
        <Card className="w-full h-full p-8 ">
            <CardHeader className="px-0 pt-0 pb-6">
                <CardTitle>
                    Sign Up to continue
                </CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>

            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className={"size-4"}/>
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input disabled={pending} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
                    <Input disabled={pending} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type={"email"} required />
                    <PasswordInput
                        disabled={pending}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                    />

                    <PasswordInput
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(event) => setconfirmPassword(event.target.value)}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        required
                    />
                    <Button type={"submit"} className={"w-full"} size={"lg"} disabled = {pending}>Continue</Button>
                </form>

                <Separator />

                <div className={"flex flex-col gap-y-2.5"}>
                    <Button onClick={() => {onProviderSignUp("google")}} disabled={pending} size={"lg"} variant={"outline"} className={"w-full relative"} >
                        <FcGoogle className={"size-5 absolute left-2.5 top-1/2 -translate-y-1/2"}/>
                        Continue with Google
                    </Button>

                    <Button onClick={() => {onProviderSignUp("github")}} disabled={pending} size={"lg"} variant={"outline"} className={"w-full relative"} >
                        <FaGithub className={"size-5 absolute left-2.5 top-1/2 -translate-y-1/2"}/>
                        Continue with Github
                    </Button>

                </div>
                <p className={"text-xs text-muted-foreground"}>
                    Already have an account?  <span onClick={() => setState("signIn")} className={"text-sky-700 hover:underline cursor-pointer"}>Sign In</span>
                </p>

            </CardContent>


        </Card>
    )

}