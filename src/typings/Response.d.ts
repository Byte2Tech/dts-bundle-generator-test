declare namespace API {
  enum ResponseStateEnum {
    success = 0,
    error = 1
  }

  interface Response<T> {
    /**
     *
     * 状态码
     * @type {ResponseStateEnum}
     * @memberof Response
     */
    status: ResponseStateEnum;
    /**
     *
     * 错误消息
     * @type {string}
     * @memberof Response
     */
    message: string;
    /**
     *
     * 响应主题
     * @type {T}
     * @memberof Response
     */
    data: T;

    extend: {
      [key: string]: any;
    };
  }
}
