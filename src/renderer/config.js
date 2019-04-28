import path from "path";

const OPERATION_FRONTEND_CONFIG = {//运营后台
  url: 'git@code.ipaynow.cn:operation_center/operation_frontend.git',
  path: path.join(process.cwd(), "operation_frontend")
}


export {
  OPERATION_FRONTEND_CONFIG
}