import { NextPage } from "next";
import Link from "next/link";

export const register: NextPage = () => {
    return (
        <div className=''>
            <h1>Sign In</h1>
            <Link href="/login">
                <button>Go to Login Page</button>
            </Link>

        </div>
    );
}

export default register;