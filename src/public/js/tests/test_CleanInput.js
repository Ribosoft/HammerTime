var test_CleanInput = new UnitTest();

test_CleanInput.AddNew([""],"");
test_CleanInput.AddNew([">GUGUG	U GU G;SDF\n;TUG CU GCUGT"],""); //Unterminated comment
test_CleanInput.AddNew([";GUTCATUHCUA UAHCUHT\nguGuUg ; TUTU"],"");//Comment in tehe middle of the line
test_CleanInput.AddNew([";GUT;  >CAT; >UA HT\n ; >;;>\n;\nAUGCGCUGA"],"AUGCGCUGA");
test_CleanInput.AddNew([";\n\n>gugu"],">GUGU");
test_CleanInput.AddNew([";comment\nAGtC\n"],"AGTC");
console.log(test_CleanInput.Execute(CleanInput));