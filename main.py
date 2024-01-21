import math

digits = "_0123456789.ABCDEFGHIJKLMNOPQRSTUVWXYZ"

replacements = {
  "PI": 3.14159265358979323,
  "_PI": -3.14159265358979323,
  "E": 2.718281828459045,
  "_E": -2.718281828459045,
  "TAU": 6.283185307179586,
  "_TAU": -6.283185307179586,
  "INF": math.inf,
  "_INF": -math.inf,
  "RTD": 57.29577951308232,
  "DTR": 0.017453292519943295,
  "PHI": 1.61803398874989484820,
  "_PHI": -1.61803398874989484820,
}

def operator(operation, result, current):
  if current in replacements.keys():
    current = replacements[current]
  else:
    current = current.replace("_", "-")
  try:
    match operation:
      case "+":
        return str(float(result) + float(current))
      case "-":
        return str(float(result) - float(current))
      case "*":
        return str(float(result) * float(current))
      case "/":
        return str(float(result) / float(current))
      case "%":
        return str(float(result) % float(current))
      case "^":
        return str(float(result) ** float(current))
      case "sqrt":
        return str(float(result) * (float(current) ** 0.5))
      case "log":
        return str(math.log(float(result), float(current)))
      case "sin":
        return str(float(result) * math.sin(float(current)))
      case "cos":
        return str(float(result) * math.cos(float(current)))
      case "tan":
        return str(float(result) * math.tan(float(current)))
      case "asin":
        return str(float(result) * math.asin(float(current)))
      case "acos":
        return str(float(result) * math.acos(float(current)))
      case "atan":
        return str(float(result) * math.atan(float(current)))
  except:
    return "0"



# TO-DO: make more base-n operations and have addition support decimals and negatives

def interpret(line):  # TO-DO: make it work with base-n later

  # add + at the beginning to add the result to 0 (same thing)
  # evaluates left to right

  line = "+" + line.replace(" ", "") + "+"
  index = 0
  result = 0
  current = ""
  operation = ""
  char = "+"

  while True:
    if char in digits:
      current += char
      index += 1
      char = line[index]
      if not char in digits:  # if the next digit is not a digit
        result = operator(operation, result, current)  # perform operation and set result to answer
        operation = ""  # reset operation
    elif char == "(":
      end = index
      layers = 1
      while layers != 0:
        end += 1
        layers += int(line[end] == "(") - int(line[end] == ")")  # if it's (, +1; if it's ), -1
      current = interpret(line[index + 1: end])
      index = end + 1
      char = line[index]
      if not char in digits:
        result = operator(operation, result, current)
        operation = ""
    else:
      operation += char
      index += 1
      if index >= len(line):
        return result
      char = line[index]
      if char in digits:
        current = ""
