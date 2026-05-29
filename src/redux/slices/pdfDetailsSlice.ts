import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PdfState {
  institute_logo: string | null;
  institute_name: string;
  test_name: string;
  time: string;
  waterMark_logo: string | null;
  waterMark_text: string;
  pdf_border: string;
  add_remark: string;
  two_column: string;
  remark: boolean;
  dropDownValue: null | string;
}

const initialState: PdfState = {
  institute_logo: null,
  institute_name: '',
  test_name: '',
  time: '',
  waterMark_logo: null,
  waterMark_text: '',
  pdf_border: '',
  add_remark: '',
  two_column: '',
  remark: false,
  dropDownValue: null,
};

const pdfDetailsSlice = createSlice({
  name: 'pdfDetails',
  initialState,

  reducers: {
    addPdfDetails: (state, action: PayloadAction<PdfState>) => {
      return { ...state, ...action.payload };
    },

    updatePdfField: (
      state,
      action: PayloadAction<{ key: keyof PdfState; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    // resetPdfDetails: () => initialState,
  },
});

export const { addPdfDetails, updatePdfField } = pdfDetailsSlice.actions;
export default pdfDetailsSlice.reducer;
