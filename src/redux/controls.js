import { createSlice } from '@reduxjs/toolkit';

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    button_disabled: false,
    creating_quiz: false,
    has_quiz_name: false,
    name_of_quiz: null,
    active_quiz: null,
    points_possible: null,
    final_score: null,
    final_results: null,
  },
  reducers: {
    setButtonDisabled: (state, action) => {
      state.button_disabled = action.payload;
    },
    setCreatingQuiz: (state, action) => {
      state.creating_quiz = action.payload;
    },
    setHasQuizName: (state, action) => {
      state.has_quiz_name = action.payload;
    },
    setNameOfQuizDispatch: (state, action) => {
      state.name_of_quiz = action.payload;
    },
    setActiveQuiz: (state, action) => {
      state.active_quiz = action.payload;
    },
    setPointsPossible: (state, action) => {
      state.points_possible = action.payload;
    },
    setFinalScore: (state, action) => {
      state.points_possible = action.payload;
    },
    setFinalResults: (state, action) => {
      state.final_results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setButtonDisabled,
  setCreatingQuiz,
  setHasQuizName,
  setNameOfQuizDispatch,
  setActiveQuiz,
  setPointsPossible,
  setFinalResults,
  setFinalScore,
} = controlsSlice.actions;

export default controlsSlice.reducer;
