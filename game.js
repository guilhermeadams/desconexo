import Javy

let jsCode = try! String(contentsOfFile: "main.ff059624.js", encoding: .utf8)

do {
    let ast = try JavaScriptParser.parse(jsCode)

    if let expression = ast.body[0] as? JavaScriptExpressionStatement,
       let object = expression.expression as? JavaScriptObjectLiteral,
       let property = object.properties[0] as? JavaScriptProperty,
       let value = property.value as? JavaScriptObjectLiteral,
       let boardsProperty = value.properties[1],
       let boardsArray = boardsProperty.value as? JavaScriptArrayLiteral {
        for element in boardsArray.elements {
            if let object = element as? JavaScriptObjectLiteral,
               let groupsProperty = object.properties[1],
               let groupsArray = groupsProperty.value as? JavaScriptArrayLiteral {
                for group in groupsArray.elements {
                    if let object = group as? JavaScriptObjectLiteral,
                       let themeProperty = object.properties[0],
                       let themeValue = themeProperty.value as? JavaScriptStringLiteral,
                       let wordsProperty = object.properties[1],
                       let wordsArray = wordsProperty.value as? JavaScriptArrayLiteral {
                        let words = wordsArray.elements.compactMap { $0 as? JavaScriptStringLiteral }.map { $0.value }

                        let theme = themeValue.value

                        // Do something with the theme and words, such as printing them to the console
                        print("Theme: \(theme)")
                        print("Words: \(words)\n")
                    }
                }
            }
        }
    }
} catch {
    print("Error parsing JavaScript code: \(error)")
}
