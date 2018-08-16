module Prettify
  where

data Doc = Empty
         | Char Char
         | Text String
         | Line
         | Concat Doc Doc
         | Union Doc Doc
           deriving (Show,Eq)

empty :: Doc
empty = Empty

fsep :: [Doc] -> Doc
fsep = fold (</>)

(</>) :: Doc -> Doc -> Doc
x </> y = x <> softline <> y

-- the softline function should insert a newline if the current line has ecome too wide
-- or a space otherwise
softline :: Doc
softline = group line

group :: Doc -> Doc
group x = flatten x `Union` x

flatten :: Doc -> Doc
flatten (x `Concat` y) = flatten x `Concat` flatten y
flatten Line = Char ' '
flatten (x `Union` _) = flatten x
flatten other = other

hcat :: [Doc] -> Doc
hcat = fold (<>)

fold :: (Doc -> Doc -> Doc) -> [Doc] -> Doc
fold f = foldr f empty

punctuate :: Doc -> [Doc] -> [Doc]
punctuate p []  = []
punctuate p [d] = [d]
punctuate p (d:ds) = (d <> p) : punctuate p ds

(<>) :: Doc -> Doc -> Doc
Empty <> y = y
x <> Empty = x
x <> y = x `Concat` y

char :: Char -> Doc
char c = Char c

text :: String -> Doc
text "" = Empty
text s = Text s

double :: Double -> Doc
double d = text (show d)

line :: Doc
line = Line

-- wtf does transform do?
compact :: Doc -> String
compact x = transform [x]
  where transform [] = ""
        transform (d:ds) =
          case d of
            Empty -> transform ds
            Char c -> c : transform ds
            Text s -> s ++ transform ds
            Line   -> '\n' : transform ds
            a `Concat` b -> transform (a:b:ds)
            _ `Union` b -> transform (b:ds)



-- this doesn't fucking work
-- currIndent needs to be visible at the top level
nest :: Int -> Doc -> Doc
nest indent doc = processNode 0 [doc]
  where
    processNode currIndent (d:ds) =
      case d of
        Empty -> Empty <> processNode currIndent ds
        Char c -> processText currIndent [c] ds
        Text s -> processText currIndent s ds
        Line -> text ("\n" ++ addIndent currIndent) <> processNode currIndent ds
        a `Concat` b -> processNode currIndent (a:b:ds)
        -- need to translate the left side. the right side is already shortened artificially
        x `Union` y -> processNode currIndent (y:ds)
    processNode currIndent [] = char ' '
    processText currIndent txt ds
      | startsWithIndentChar txt = text txt <> processNode (currIndent + indent) ds
      | hasOutdentChar txt = text (removeIndent indent txt) <> processNode (currIndent - indent) ds
      | otherwise = text txt <> processNode currIndent ds


removeIndent :: Int -> String -> String
removeIndent indent (x:xs) | indent == 0 = (x:xs)
                           | length xs == 0 = [x]
                           | indent > 0 && x == ' ' = removeIndent (indent - 1) xs

    
addIndent :: Int -> String
addIndent 0 = ""
addIndent currIndent = replicate currIndent ' '



startsWithIndentChar :: [Char] -> Bool
startsWithIndentChar (x:xs) = isIndentChar x

hasOutdentChar :: [Char] -> Bool
hasOutdentChar [] = False
hasOutdentChar [x] = isOutdentChar x
hasOutdentChar (x:xs) | x == ' ' = hasOutdentChar xs
                      | x /= ' ' = False


  
isIndentChar :: Char -> Bool
isIndentChar c = case c of
                   '{' -> True
                   '(' -> True
                   '[' -> True
                   otherwise -> False

isOutdentChar :: Char -> Bool
isOutdentChar c = case c of
                   '}' -> True
                   ')' -> True
                   ']' -> True
                   otherwise -> False

pretty :: Int -> Doc -> String
pretty width x = best 0 [x]
  where best col (d:ds) =
          case d of
            Empty -> best col ds
            Char c -> c : best (col + 1) ds
            Text s -> s ++ best (col + length s) ds
            Line -> '\n' : best 0 ds
            a `Concat` b -> best col (a:b:ds)
            a `Union` b -> nicest col (best col (a:ds))
                                      (best col (b:ds))
        best _ _ = ""
        nicest col a b | (width - least) `fits` a = a
                       | otherwise                = b
                       where least = min width col

fits :: Int -> String -> Bool
w `fits` _ | w < 0 = False
w `fits` ""        = True
w `fits` ('\n':_)  = True
w `fits` (c:cs)    = (w - 1) `fits` cs

-- my naive solution
fill :: Int -> Doc -> Doc
fill width Empty = text (replicate width ' ')
fill width d | longestLineWidth >= width = d
             | otherwise = d <> text (replicate (width - lastLineWidth) ' ')
             where longestLineWidth = maximum . map length . lines $ compact d
                   lastLineWidth = last . map length . lines $ compact d


-- this is the correct solution
-- fill :: Int -> Doc -> Doc
-- fill desiredWidth doc = processNode 0 [doc]
--   where
--     processNode col (d:ds) =
--       case d of
--         Empty -> Empty <> processNode col ds
--         Char c -> Char c <> processNode (col + 1) ds
--         Text s -> Text s <> processNode (col + length s) ds
--         Line -> spaceOut col <> Line <> processNode 0 ds
--         a `Concat` b -> processNode col (a:b:ds)
--         -- need to translate the left side. the right side is already shortened artificially
--         x `Union` y -> processNode col (x:ds) `Union` processNode col (y:ds)
--     processNode col [] = spaceOut col
--     spaceOut col = Text (replicate (desiredWidth - col) ' ')
