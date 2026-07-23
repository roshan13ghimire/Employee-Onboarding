function Sidebar() {

    return (

        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h2 className="text-2xl font-bold mb-8">
                Employee Portal
            </h2>


            <nav className="space-y-4">


                <a
                    href="/dashboard"
                    className="block hover:bg-gray-700 p-3 rounded"
                >
                    Dashboard
                </a>


                <a
                    href="/hr-documents"
                    className="block hover:bg-gray-700 p-3 rounded"
                >
                    Documents
                </a>


                <a
                    href="/profile"
                    className="block hover:bg-gray-700 p-3 rounded"
                >
                    Profile
                </a>


            </nav>


        </aside>

    );

}


export default Sidebar;