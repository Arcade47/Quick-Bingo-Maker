// if not quadratic, then there are potentially "small" and "large" bingos
const grid_h_n = 4;
const grid_v_n = 4;

// list of items
const items = [
    ["her-", "gehen"],
    ["Abgefrüh-", "stückt"],
    ["Passt wie", "Arsch auf Eimer"],
    ["we'll have", "to see"],
    ["say okay", "hey"],
    ["okay", "hey"],
    ["That's", "se point"],
    ["Dead-", "line"],
    ["Manu-", "script"],
    ["un-", "reveal"],
    ["money"],
    ["Team"],
    ["sounds", "good"],
    ["great,", "thanks"],
    ["business", "as usual"],
    ["what about", "the...", "[pause]"],
    ["GAN", "stuff"],
    ["Lübeck"],
    ["Buda-", "pest"],
    ["what can", "you do"],
    ["very", "nice"],
    ["it hasn't", "arrived", "us/me"],
    ["Revi-", "sion"],
    ["Paper", "Writing"]
];

// derived
const n_items = grid_h_n*grid_v_n;