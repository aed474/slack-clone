import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {SignInFlow} from "@/features/auth/types";
import {useState} from "react";

interface SignUpCardProps {
    setState: (state:SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");

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

            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input disabled={false} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type={"email"} required />
                    <Input disabled={false} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type={"password"} required />
                    <Input disabled={false} value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Confirm Password" type={"password"} required />
                    <Button type={"submit"} className={"w-full"} size={"lg"} disabled = {false}>Continue</Button>
                </form>

                <Separator />

                <div className={"flex flex-col gap-y-2.5"}>
                    <Button onClick={() => {}} disabled={false} size={"lg"} variant={"outline"} className={"w-full relative"} >
                        <FcGoogle className={"size-5 absolute left-2.5 top-1/2 -translate-y-1/2"}/>
                        Continue with Google
                    </Button>

                    <Button onClick={() => {}} disabled={false} size={"lg"} variant={"outline"} className={"w-full relative"} >
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