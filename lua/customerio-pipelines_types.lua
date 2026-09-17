-- Typed models for the CustomerioPipelines SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Alia
---@field previousId string
---@field userId string

---@class AliaCreateData
---@field previousId string
---@field userId string

---@class Batch
---@field batch? table
---@field context? any

---@class BatchCreateData
---@field batch? table
---@field context? any

---@class Group

---@class GroupCreateData

---@class Identify

---@class IdentifyCreateData

---@class Page

---@class PageCreateData

---@class Screen

---@class ScreenCreateData

---@class Track

---@class TrackCreateData

local M = {}

return M
