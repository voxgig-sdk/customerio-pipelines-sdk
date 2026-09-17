// Typed models for the CustomerioPipelines SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/customerio-pipelines-sdk/go/core"
)

// Alia is the typed data model for the alia entity.
type Alia struct {
	PreviousId string `json:"previousId"`
	UserId string `json:"userId"`
}

// AliaCreateData is the typed request payload for Alia.CreateTyped.
type AliaCreateData struct {
	PreviousId string `json:"previousId"`
	UserId string `json:"userId"`
}

// Batch is the typed data model for the batch entity.
type Batch struct {
	Batch *[]any `json:"batch,omitempty"`
	Context *any `json:"context,omitempty"`
}

// BatchCreateData is the typed request payload for Batch.CreateTyped.
type BatchCreateData struct {
	Batch *[]any `json:"batch,omitempty"`
	Context *any `json:"context,omitempty"`
}

// Group is the typed data model for the group entity.
type Group struct {
}

// GroupCreateData is the typed request payload for Group.CreateTyped.
type GroupCreateData struct {
}

// Identify is the typed data model for the identify entity.
type Identify struct {
}

// IdentifyCreateData is the typed request payload for Identify.CreateTyped.
type IdentifyCreateData struct {
}

// Page is the typed data model for the page entity.
type Page struct {
}

// PageCreateData is the typed request payload for Page.CreateTyped.
type PageCreateData struct {
}

// Screen is the typed data model for the screen entity.
type Screen struct {
}

// ScreenCreateData is the typed request payload for Screen.CreateTyped.
type ScreenCreateData struct {
}

// Track is the typed data model for the track entity.
type Track struct {
}

// TrackCreateData is the typed request payload for Track.CreateTyped.
type TrackCreateData struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
