import { useConfirm } from "../hooks/useConfirm"
import { useTheme } from "../hooks/useTheme"

type Props = {
    onConfirm: () => void
    onCancel: () => void

}

export default function ConfirmModal({
     onConfirm, onCancel

}: Props){

    const {theme} = useTheme()

    const {confirmOptions} = useConfirm()

    if(!confirmOptions) return

    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
            <div className={`rounded-2xl p-6 w-96 shadow-2xl ${theme.background}`} onClick={(e) => e.stopPropagation()}>
                <h3 className={`text-lg font-semibold mb-3 ${theme.text}`}>
                    Confirm
                </h3>

                <p className={`text-sm opacity-80 mb-6 whitespace-pre-line ${theme.text}`}>
                    {confirmOptions.message}
                </p>

                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className={`px-4 py-2 rounded-lg ${theme.text} ${theme.border} ${theme.hover}`}>
                        {confirmOptions.cancelText ?? 'Cancel'}

                    </button>

                    <button onClick={onConfirm} className={`px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 ${theme.text}`}>
                        {confirmOptions.confirmText ?? 'Confirm'}

                    </button>

                </div>

            </div>
            
        </div>

    )

}