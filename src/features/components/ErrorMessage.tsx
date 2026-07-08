import { getErrorMessage } from "../shared/apiError";
import type { ApiError } from "../model/types";

type Props = {
    error: ApiError

}

export default function ErrorMessage({
    error

}:Props){

    return(
        <div className="max-w-4xl mx-auto mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {getErrorMessage(error)}

        </div>

    )

}