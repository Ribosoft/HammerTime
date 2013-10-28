﻿var test_Decompress = new UnitTest(DecompressObjectTableIntoObjectArray);

var inputArray =
    [
            [
            "Sequence", "CataliticCoreStart", "ID", "StructuresSFold", "StructureUnaFold", "Fitness_Shape", "Fitness_Shape_dG", "Fitness_Target", "Fitness_Target_dG", "Fitness_Specificity", "Fitness_AnnealingT", "CataliticCoreType", "cutSiteID", "cutSiteLocation", "requestID", "MeltingTemperature", "LeftArmLength", "RightArmLength"
            ]
            ,
            [
            "UGCUCUGAUGAGUCCGUGAGGACGAAACUAG", 4, "0",
            [

            [
            "EnergyInterval", "Frequency", "LowestFreeEnergy", "ConnectedPairs", "Fitness"
            ]
            ,
            [

            {
                "Min": -11.8, "Max": -11.14
            }
            , 0.641, -11.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -11.14, "Max": -10.48
            }
            , 0.162, -10.9,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -10.48, "Max": -9.82
            }
            , 0.01, -10.4,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -9.82, "Max": -9.16
            }
            , 0.083, -9.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -9.16, "Max": -8.5
            }
            , 0.052, -9.1,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -8.5, "Max": -7.84
            }
            , 0.027, -8.4,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -7.84, "Max": -7.18
            }
            , 0.013, -7.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -7.18, "Max": -6.52
            }
            , 0.006, -7,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -6.52, "Max": -5.86
            }
            , 0.001, -6.2,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -5.86, "Max": -5.2
            }
            , 0.005, -5.7,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]

            ]
            , null, 639.8404247786949, 0, 589.8404247786949, 0, 0, 306.9681148114347, 0, "GUC0", 18, "Test", 306.9681148114347, 3, 4
            ]
            ,
            [
            "GCUCUGAUGAGUCCGUGAGGACGAAACUAGU", 3, "1",
            [

            [
            "EnergyInterval", "Frequency", "LowestFreeEnergy", "ConnectedPairs", "Fitness"
            ]
            ,
            [

            {
                "Min": -11.8, "Max": -11.14
            }
            , 0.641, -11.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -11.14, "Max": -10.48
            }
            , 0.162, -10.9,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -10.48, "Max": -9.82
            }
            , 0.01, -10.4,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -9.82, "Max": -9.16
            }
            , 0.083, -9.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -9.16, "Max": -8.5
            }
            , 0.052, -9.1,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -8.5, "Max": -7.84
            }
            , 0.027, -8.4,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -7.84, "Max": -7.18
            }
            , 0.013, -7.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -7.18, "Max": -6.52
            }
            , 0.006, -7,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -6.52, "Max": -5.86
            }
            , 0.001, -6.2,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -5.86, "Max": -5.2
            }
            , 0.005, -5.7,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]

            ]
            , null, 639.8404247786949, 0, 294.92021238934745, 0, 0, 306.9681148114347, 0, "GUC0", 18, "Test", 306.9681148114347, 4, 3
            ]
            ,
            [
            "UGCUCUGAUGAGUCCGUGAGGACGAAACUAGU", 4, "2",
            [

            [
            "EnergyInterval", "Frequency", "LowestFreeEnergy", "ConnectedPairs", "Fitness"
            ]
            ,
            [

            {
                "Min": -11.8, "Max": -11.14
            }
            , 0.641, -11.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -11.14, "Max": -10.48
            }
            , 0.162, -10.9,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -10.48, "Max": -9.82
            }
            , 0.01, -10.4,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -9.82, "Max": -9.16
            }
            , 0.083, -9.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -9.16, "Max": -8.5
            }
            , 0.052, -9.1,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -8.5, "Max": -7.84
            }
            , 0.027, -8.4,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -7.84, "Max": -7.18
            }
            , 0.013, -7.8,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -7.18, "Max": -6.52
            }
            , 0.006, -7,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -6.52, "Max": -5.86
            }
            , 0.001, -6.2,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]
            ,
            [

            {
                "Min": -5.86, "Max": -5.2
            }
            , 0.005, -5.7,
            [
            "1,-1,A", "2,-1,C", "3,-1,U", "4,-1,U", "5,-1,A", "6,-1,A", "7,-1,C", "8,-1,A", "9,-1,A", "10,-1,C", "11,-1,U", "12,-1,G", "13,-1,A", "14,-1,U", "15,-1,G", "16,-1,A", "17,28,G", "18,27,U", "19,26,C", "20,25,C", "21,-1,G", "22,-1,U", "23,-1,G", "24,-1,A", "25,20,G", "26,19,G", "27,18,A", "28,17,C", "29,-1,G", "30,-1,A", "31,-1,A", "32,-1,A", "33,-1,C", "34,-1,C", "35,-1,A", "36,-1,C", "37,-1,C", "38,-1,A", "39,-1,A", "40,-1,G", "41,-1,C", "42,-1,A"
            ]
            , 639.840424778695
            ]

            ]
            , null, 639.8404247786949, 0, 589.8404247786949, 0, 0, 308.9681148114347, 0, "GUC0", 18, "Test", 308.9681148114347, 4, 4
            ]

    ];

var outputObjectArray =  [{"Sequence":"UGCUCUGAUGAGUCCGUGAGGACGAAACUAG","CataliticCoreStart":4,"ID":"0","StructuresSFold":[["EnergyInterval","Frequency","LowestFreeEnergy","ConnectedPairs","Fitness"],[{"Min":-11.8,"Max":-11.14},0.641,-11.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-11.14,"Max":-10.48},0.162,-10.9,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-10.48,"Max":-9.82},0.01,-10.4,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-9.82,"Max":-9.16},0.083,-9.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-9.16,"Max":-8.5},0.052,-9.1,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-8.5,"Max":-7.84},0.027,-8.4,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-7.84,"Max":-7.18},0.013,-7.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-7.18,"Max":-6.52},0.006,-7,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-6.52,"Max":-5.86},0.001,-6.2,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-5.86,"Max":-5.2},0.005,-5.7,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695]],"StructureUnaFold":null,"Fitness_Shape":639.8404247786949,"Fitness_Shape_dG":0,"Fitness_Target":589.8404247786949,"Fitness_Target_dG":0,"Fitness_Specificity":0,"Fitness_AnnealingT":306.9681148114347,"CataliticCoreType":0,"cutSiteID":"GUC0","cutSiteLocation":18,"requestID":"Test","MeltingTemperature":306.9681148114347,"LeftArmLength":3,"RightArmLength":4},{"Sequence":"GCUCUGAUGAGUCCGUGAGGACGAAACUAGU","CataliticCoreStart":3,"ID":"1","StructuresSFold":[["EnergyInterval","Frequency","LowestFreeEnergy","ConnectedPairs","Fitness"],[{"Min":-11.8,"Max":-11.14},0.641,-11.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-11.14,"Max":-10.48},0.162,-10.9,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-10.48,"Max":-9.82},0.01,-10.4,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-9.82,"Max":-9.16},0.083,-9.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-9.16,"Max":-8.5},0.052,-9.1,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-8.5,"Max":-7.84},0.027,-8.4,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-7.84,"Max":-7.18},0.013,-7.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-7.18,"Max":-6.52},0.006,-7,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-6.52,"Max":-5.86},0.001,-6.2,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-5.86,"Max":-5.2},0.005,-5.7,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695]],"StructureUnaFold":null,"Fitness_Shape":639.8404247786949,"Fitness_Shape_dG":0,"Fitness_Target":294.92021238934745,"Fitness_Target_dG":0,"Fitness_Specificity":0,"Fitness_AnnealingT":306.9681148114347,"CataliticCoreType":0,"cutSiteID":"GUC0","cutSiteLocation":18,"requestID":"Test","MeltingTemperature":306.9681148114347,"LeftArmLength":4,"RightArmLength":3},{"Sequence":"UGCUCUGAUGAGUCCGUGAGGACGAAACUAGU","CataliticCoreStart":4,"ID":"2","StructuresSFold":[["EnergyInterval","Frequency","LowestFreeEnergy","ConnectedPairs","Fitness"],[{"Min":-11.8,"Max":-11.14},0.641,-11.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-11.14,"Max":-10.48},0.162,-10.9,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-10.48,"Max":-9.82},0.01,-10.4,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-9.82,"Max":-9.16},0.083,-9.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-9.16,"Max":-8.5},0.052,-9.1,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-8.5,"Max":-7.84},0.027,-8.4,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-7.84,"Max":-7.18},0.013,-7.8,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-7.18,"Max":-6.52},0.006,-7,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-6.52,"Max":-5.86},0.001,-6.2,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695],[{"Min":-5.86,"Max":-5.2},0.005,-5.7,["1,-1,A","2,-1,C","3,-1,U","4,-1,U","5,-1,A","6,-1,A","7,-1,C","8,-1,A","9,-1,A","10,-1,C","11,-1,U","12,-1,G","13,-1,A","14,-1,U","15,-1,G","16,-1,A","17,28,G","18,27,U","19,26,C","20,25,C","21,-1,G","22,-1,U","23,-1,G","24,-1,A","25,20,G","26,19,G","27,18,A","28,17,C","29,-1,G","30,-1,A","31,-1,A","32,-1,A","33,-1,C","34,-1,C","35,-1,A","36,-1,C","37,-1,C","38,-1,A","39,-1,A","40,-1,G","41,-1,C","42,-1,A"],639.840424778695]],"StructureUnaFold":null,"Fitness_Shape":639.8404247786949,"Fitness_Shape_dG":0,"Fitness_Target":589.8404247786949,"Fitness_Target_dG":0,"Fitness_Specificity":0,"Fitness_AnnealingT":308.9681148114347,"CataliticCoreType":0,"cutSiteID":"GUC0","cutSiteLocation":18,"requestID":"Test","MeltingTemperature":308.9681148114347,"LeftArmLength":4,"RightArmLength":4}];

test_Decompress.AddNewCase([inputArray], outputObjectArray);

console.log(objectCompare(test_Decompress));
