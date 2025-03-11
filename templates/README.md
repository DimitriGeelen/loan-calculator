# Loan Calculator Templates

This directory contains CSV templates that can be imported into Google Sheets or Excel to create loan calculators with formulas.

## Available Templates

1. **loan_calculator.csv** - Basic loan calculator with:
   - Input fields for loan amount, interest rate, term, and payment frequency
   - Calculated monthly payment, total interest, and amortization schedule
   - Formula-driven calculations that update automatically

2. **loan_calculator_with_balloon.csv** - Extended loan calculator that includes:
   - All features of the basic calculator
   - Balloon payment option (amount to leave unpaid at the end of the term)
   - Adjusted payment calculations that account for the balloon amount

## How to Import to Google Sheets

1. Open Google Sheets (https://docs.google.com/spreadsheets)
2. Create a new blank spreadsheet
3. Go to File > Import > Upload
4. Select the CSV file from this directory
5. Choose "Replace spreadsheet" in the import options
6. Click "Import data"

## Important Notes

- In Google Sheets, you may need to replace semicolons (;) with commas (,) in the formulas, depending on your locale settings
- The PMT formula for balloon payments in Google Sheets uses the syntax: `=PMT(rate, nper, pv, fv)`
  - Where `fv` is the balloon amount
- For a complete amortization schedule, you'll need to copy the formulas down based on your loan term
  - For a 30-year loan with monthly payments, you'll need 360 rows

## Formula Explanations

### Basic Monthly Payment (no balloon)
```
=PMT(B4/B6/100, B5*B6, -B3)
```
- B4 = Annual interest rate (%)
- B6 = Payments per year
- B5 = Loan term in years
- B3 = Loan amount

### Monthly Payment with Balloon
```
=PMT(B4/B6/100, B5*B6, -B3, B7)
```
- B7 = Balloon payment amount

This calculates a lower monthly payment that will leave the balloon amount unpaid at the end of the term.