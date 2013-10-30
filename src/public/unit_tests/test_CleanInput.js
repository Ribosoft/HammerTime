var seqInput = new SequenceInput();
var test_CleanInput = new UnitTest(seqInput.cleanInput);

test_CleanInput.AddNewCase([""],"");
test_CleanInput.AddNewCase([">GUGUG	U GU G;SDF\n;TUG CU GCUGT"],""); //Unterminated comment
test_CleanInput.AddNewCase([";GUTCATUHCUA UAHCUHT\nguGuUg ; TUTU"],"");//Comment in tehe middle of the line
test_CleanInput.AddNewCase([";GUT;  >CAT; >UA HT\n ; >;;>\n;\nAUGCGCUGA"],"AUGCGCUGA");
test_CleanInput.AddNewCase([";\n\n>gugu"],">GUGU");
test_CleanInput.AddNewCase([";comment\nAGtC\n"],"AGTC");
console.log(stringCompare(test_CleanInput));
