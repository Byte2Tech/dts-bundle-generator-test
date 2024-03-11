import type { RequestConfig } from 'umi'
import { message, notification } from 'antd'
import './app.less'

export async function render(oldRender: any) {
  oldRender()
}

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  message?: string;
  errorMessage?: string;
  showType?: ErrorShowType;
}

export const request: RequestConfig = {
  errorConfig: {
    errorThrower(res: any) {
      const { success, data, errorCode, message: errorMessage, showType } = res
      if (typeof res !== 'string' && !success) {
        const error: any = new Error(errorMessage)
        error.name = 'BizError'
        error.info = { errorCode, errorMessage, showType, data }
        throw error // 抛出自制的错误
      }
    },
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo
          switch (errorInfo.showType) {
          case ErrorShowType.SILENT:
            // do nothing
            break
          case ErrorShowType.WARN_MESSAGE:
            message.warn(errorMessage)
            break
          case ErrorShowType.ERROR_MESSAGE:
            message.error(errorMessage)
            break
          case ErrorShowType.NOTIFICATION:
            notification.open({
              description: errorMessage,
              message: errorCode,
            })

            break
          case ErrorShowType.REDIRECT:
            // TODO: redirect
            break
          default:
            message.error(errorMessage)
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status: ${error.response.status}`)
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.')
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.')
      }
    }
  },
  requestInterceptors: [],
  responseInterceptors: [
    function returnValInterceptor (response) {
      // 处理不标准返回值
      const { data } = response
      if (Object.prototype.hasOwnProperty.call(data, 'status')) {
        return {
          ...response,
          data: {
            ...data,
            success: (data as any).status === 0
          }
        }
      }
      return response
    }
  ],
}


