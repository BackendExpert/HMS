import React from 'react'
import { Fa1, Fa2, Fa3, Fa4, Fa5, Fa6 } from 'react-icons/fa6'

const SignUpInfoStd = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 px-4">
            <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-2xl">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">
                    Student Sign-Up Guide
                </h1>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <Fa1 className="mt-1 text-blue-600 w-5 h-5" />
                        <p className="ml-3 text-gray-600">
                            Select your role as <span className="font-semibold text-blue-600">Student</span> in the sign-up form.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <Fa2 className="mt-1 text-blue-600 w-5 h-5" />
                        <p className="ml-3 text-gray-600">
                            You'll see additional fields to select your <span className="font-semibold">Faculty</span> and enter your <span className="font-semibold">Nearest City</span>.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <Fa3 className="mt-1 text-blue-600 w-5 h-5" />
                        <p className="ml-3 text-gray-600">
                            Verify your university email address. After registration, you’ll be redirected to an OTP verification page. An OTP will be sent to your entered email.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <Fa4 className="mt-1 text-blue-600 w-5 h-5" />
                        <p className="ml-3 text-gray-600">
                            After verifying your email, you’ll receive a confirmation email. Then, wait for your account to be approved by an administrator.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <Fa5 className="mt-1 text-blue-600 w-5 h-5" />
                        <p className="ml-3 text-gray-600">
                            Once approved, you’ll be able to log in and access your student dashboard.
                        </p>
                    </div>

                    <div className="flex items-start">
                        <Fa6 className="mt-1 text-blue-600 w-5 h-5" />
                        <p className="ml-3 text-gray-600">
                            A brief introduction to using the system will be available on your dashboard.
                        </p>
                    </div>

                    <div className="text-center"><a href="/signup" className="text-blue-500 duration-500 hover:underline font-semibold">Back to Signup</a></div>
                </div>
            </div>
        </div>
    )
}

export default SignUpInfoStd
