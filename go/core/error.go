package core

type CustomerioPipelinesError struct {
	IsCustomerioPipelinesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCustomerioPipelinesError(code string, msg string, ctx *Context) *CustomerioPipelinesError {
	return &CustomerioPipelinesError{
		IsCustomerioPipelinesError: true,
		Sdk:              "CustomerioPipelines",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CustomerioPipelinesError) Error() string {
	return e.Msg
}
