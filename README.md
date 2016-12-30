# recursive-react

Render recursive components, wire up callbacks, store selections in an appropriate data structure etc

### Problem

Given a collection of trees of arbitrary depth, where each tree is comprised of alternating node types and where all leaf nodes are of type `item` e.g.

```
[items] -> [groups] -> [items] -> [groups] -> [items]
```

we want to 

1. ~~represent this in an interactive UI~~
    - ~~selecting the root item will show its groups (if it has any), and so on all the way down~~
2. ~~capture the path taken to a particular leaf node when it is selected~~
3. capture all the selected leaf nodes, and their paths, in a suitable data structure
    - duplicate selections are permitted, and need to be aggregated

### Example

Consider the following structure

```
                       i:28578
              ____________|_________________
             |                              |
            g:1                            g:24
        _____|_____              ___________|___________
       |           |            |     |     |     |     |
     i:504       i:506        i:552 i:553 i:554 i:555 i:556
                   |
                   |
                  g:5
  _________________|_________________
 |     |     |     |     |     |     |
i:32  i:31  i:35  i:62  i:8   i:51 i:105
```

Upon selecting the root item, the user is presented with the options at the next level, and so on as they proceed. Once minimum selection criteria have been met (say, minimum 1 item per group), the selection needs to be stored. As part of the same session, the user may select the same root node again, and go through the same selection process as before. If the resulting selections _exactly_ match a previous one, this needs to be recorded as such. If the 2nd selected differs by just a single node, it is to be considered as new.

### Current Approach

The `id` of a selected node is appended to the previously selected node `id`s, e.g. for the structure above, a user may select

**Selection 1**
```
28578:1:506:5:31
28578:24:556
```
These two IDs taken together form a single selection.

**Selection 2**

If the user then selects the same root node, but a different set of children, we may get
```
28578:1:504
28578:24:552
```
This selection has the same root node, but differing children, so it is to be considered as a new value.

**Selection 3**

Finally, the user makes the same selection as the first
```
28578:1:506:5:31
28578:24:556
```
This needs to be identified as being the same as **Selection 1**, and the count incremented to 2.

### TODO

What is the most appropriate data structure to store these selections in?

**Thoughts/Caveats**
- A flat key-value lookup would be the most efficient way to determine if a duplicate selection has been made
- Human readable keys would be nice
- The resulting structure would need to be sent to a back-end for processing. Therefore, the back-end needs to be able to either decode things in the same way, or receive unencoded data that is meaningful.
