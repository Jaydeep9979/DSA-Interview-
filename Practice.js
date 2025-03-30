function detectCycle() {
    let q = [];
    q.push([Node, -1]);
    visited[node] = true;
    while (q.length != 0) {
        let [node, parent] = q.shift();

        for (let nbr of graph[node]) {
            if (nbr == parent) {
                continue;
            }

            if (visited[nbr] === true) {
                return true;
            }

            visited[nbr] = true;
            q.push([nbr, node]);
        }
    }
    return false;
}

//Time complexity : O