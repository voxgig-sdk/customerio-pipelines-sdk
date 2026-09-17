-- CustomerioPipelines SDK error

local CustomerioPipelinesError = {}
CustomerioPipelinesError.__index = CustomerioPipelinesError


function CustomerioPipelinesError.new(code, msg, ctx)
  local self = setmetatable({}, CustomerioPipelinesError)
  self.is_sdk_error = true
  self.sdk = "CustomerioPipelines"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CustomerioPipelinesError:error()
  return self.msg
end


function CustomerioPipelinesError:__tostring()
  return self.msg
end


return CustomerioPipelinesError
