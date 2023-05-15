import { Backdrop, CircularProgress } from "@mui/material"

export default function FullLoading({isOpen}: FullLoadingProps) {
    return (
        <Backdrop open={isOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}


type FullLoadingProps = {
    isOpen: boolean
}