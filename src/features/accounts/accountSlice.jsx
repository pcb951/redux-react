import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPerPose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    applyLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loanPerPose = action.payload.purpose;
        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
      state.loan = 0;
      state.loanPerPose = "";
    },
  },
});

export const { deposit, withdraw, applyLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
