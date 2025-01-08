import React from 'react'

function BottomPage() {
    return (
        <div className="bg-gray-900 text-gray-100 py-8">
            <footer className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-center text-sm">
                        &copy; 2024 Note Nest. All rights reserved. Made with <span className=' text-3xl'>❤️</span> NOTE NEST.
                    </p>
                    <ul className="flex space-x-6 mt-4">
                        <li><a href="/PrivacyPolicy" className="text-gray-400 hover:text-gray-200 transition duration-200">Privacy Policy</a></li>
                        <li><a href="/TermsOfUse" className="text-gray-400 hover:text-gray-200 transition duration-200">Terms of Use</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-gray-200 transition duration-200">Contact Us</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default BottomPage
