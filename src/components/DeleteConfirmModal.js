"use client";


export default function DeleteConfirmModal(props) {

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="w-10/12 lg:w-4/12 p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                    <h3 className="pb-8 font-cormorant font-cormorant text-2xl">Are you sure you want to remove this person from your the group?</h3>
                    <div className="flex justify-center gap-20">
                        <button
                            onClick={props.handleModalClose}
                            className="px-4 py-2 font-cormorant bg-rose-700 text-white text-base font-medium shadow-sm hover:bg-gray-700"
                        >
                            Remove
                        </button>
                        <button
                            onClick={props.handleModalClose}
                            className="px-4 py-2 font-cormorant bg-black text-white text-base font-medium shadow-sm hover:bg-gray-700"
                        >
                            Close
                        </button>                        
                    </div>
                </div>
            </div>
        </div>
    );
}