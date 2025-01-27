import Clipboard from 'clipboard'
import { sendErrorMessage, sendSuccessMessage } from './message'

function clipboardSuccess(msg) {
    sendSuccessMessage(msg || '复制成功')
}

function clipboardError(msg) {
    sendErrorMessage(msg || '嗯...发生了点小错误')
}

export default function handleClipboard(text, event, msg) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on('success', () => {
        clipboardSuccess(msg)
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        clipboardError(msg)
        clipboard.destroy()
    })
    clipboard.onClick(event)
}
