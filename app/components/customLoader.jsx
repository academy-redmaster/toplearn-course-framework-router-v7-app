import {Spinner} from "@heroui/spinner";

export default function CustomLoader() {
    return (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
            <Spinner size="lg" />
            <span className="text-2xl font-semibold">Loading...</span>
        </div>
    )
}