import { createSlice } from "@reduxjs/toolkit";

export const controlsSlice = createSlice({
  name: "controls",
  initialState: {
    button_disabled: false,
    creating_quiz: false,
    has_quiz_name: false,
    name_of_quiz: null,
    active_group: null,
    points_possible: null,
    final_score: null,
    final_results: null,
    groups: null,
    quiz_reset: false,
    view_results: false,
    new_quiz_added: false,
    edit_quiz: false,
    isImageQuiz: false,
    quizTypeSelected: false,
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
    setActiveGroup: (state, action) => {
      state.active_group = action.payload;
    },
    setPointsPossible: (state, action) => {
      state.points_possible = action.payload;
    },
    setFinalScore: (state, action) => {
      state.final_score = action.payload;
    },
    setFinalResults: (state, action) => {
      state.final_results = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setQuizReset: (state, action) => {
      state.quiz_reset = action.payload;
    },
    setViewResults: (state, action) => {
      state.view_results = action.payload;
    },
    setNewQuizAdded: (state, action) => {
      state.new_quiz_added = action.payload;
    },
    setEditQuiz: (state, action) => {
      state.edit_quiz = action.payload;
    },
    setIsImageQuiz: (state, action) => {
      state.isImageQuiz = action.payload;
    },
    setQuizTypeSelected: (state, action) => {
      state.quizTypeSelected = action.payload;
    },
  },
});

export const {
  setButtonDisabled,
  setCreatingQuiz,
  setHasQuizName,
  setNameOfQuizDispatch,
  setActiveGroup,
  setPointsPossible,
  setFinalResults,
  setFinalScore,
  setGroups,
  setQuizReset,
  setViewResults,
  setNewQuizAdded,
  setEditQuiz,
  setIsImageQuiz,
  setQuizTypeSelected,
} = controlsSlice.actions;

export default controlsSlice.reducer;
