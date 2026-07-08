import { useToast } from "../hooks/useToast"

export default function ToastMessage(){

    const {toastMessage} = useToast()

    if(!toastMessage) return null

    return (
        <div className={`fixed top-6 right-6 px-4 py-3 rounded-xl shadow-lg z-50 text-white ${toastMessage.type === 'success' ? 'bg-green-600': 'bg-red-600'}`}>
            {toastMessage.message}

        </div>

    )

}