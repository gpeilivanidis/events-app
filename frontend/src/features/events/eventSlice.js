import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
    events: [],
    viewEvent: null,
    viewEventSuccess: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// get events
export const getEvents = createAsyncThunk('events/getEvents',async (searchQuery = '',thunkAPI) => {
    try {
        return await eventService.getEvents(searchQuery)
    } catch (error) {

        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// get my events
export const getMyEvents = createAsyncThunk('events/getMyEvents', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventService.getMyEvents(token)

    } catch (error) {
        
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// get event
export const getEvent = createAsyncThunk('events/getEvent', async (id,thunkAPI) => {
    try {
        return await eventService.getEvent(id)
    } catch (error) {
        
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// create event
export const createEvent = createAsyncThunk('events/createEvent', async (eventData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventService.createEvent(eventData, token)

    } catch (error) {
        
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// update event
export const updateEvent = createAsyncThunk('events/updateEvent', async ({id,eventData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventService.updateEvent(id, eventData, token)

    } catch (error) {
        
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// delete event
export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await eventService.deleteEvent(id, token)
        
    } catch (error) {
        
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.viewEventSuccess = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        // get events
        .addCase(getEvents.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getEvents.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.events = action.payload
        })
        .addCase(getEvents.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // get my events
        .addCase(getMyEvents.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getMyEvents.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.events = action.payload
        })
        .addCase(getMyEvents.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // get event
        .addCase(getEvent.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getEvent.fulfilled, (state, action) => {
            state.isLoading = false
            state.viewEventSuccess = true
            state.viewEvent = action.payload
        })
        .addCase(getEvent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // create event
        .addCase(createEvent.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.viewEvent = action.payload
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // update event
        .addCase(updateEvent.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.viewEvent = action.payload
        })
        .addCase(updateEvent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // delete event
        .addCase(deleteEvent.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.events = state.events.filter(
                (event) => event._id !== action.payload.id
            )
            state.viewEvent = null
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = eventSlice.actions
export default eventSlice.reducer