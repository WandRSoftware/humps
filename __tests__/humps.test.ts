/**
 * These tests are a machine-generated Javascript translation of the tests
 * from the pyhumps package for python: https://pypi.org/project/pyhumps
 */
import * as humps from '../src';

describe('camelize', () => {
  test.each([
    ["fallback_url", "fallbackUrl"],
    ["scrubber_media_url", "scrubberMediaUrl"],
    ["dash_url", "dashUrl"],
    ["_fallback_url", "_fallbackUrl"],
    ["__scrubber_media___url_", "__scrubberMediaUrl_"],
    ["_url__", "_url__"],
    ["API", "API"],
    ["_API_", "_API_"],
    ["__API__", "__API__"],
    ["APIResponse", "APIResponse"],
    ["_APIResponse_", "_APIResponse_"],
    ["__APIResponse__", "__APIResponse__"],
    // Fixed issue #128
    ["whatever_10", "whatever10"],
    // Fixed issue # 18
    ["test-1-2-3-4-5-6", "test123456"],
    // Fixed issue # 61
    ["test_n_test", "testNTest"],
    // Fixed issue # 148
    ["field_value_2_type", "fieldValue2Type"],
    // Fixed issue # 256
    ["", ""],
    [null, ""],
  ])(
    'camelize("%s") should return "%s"',
    (inputStr, expectedOutput) => {
      const output = humps.camelize((inputStr as string));
      expect(output).toBe(expectedOutput);
    }
  );

  test('should camelize dict with list of dicts', () => {
    const actual = humps.camelize({
      videos: [
        {
          fallback_url: "https://media.io/video",
          scrubber_media_url: "https://media.io/video",
          dash_url: "https://media.io/video",
        },
      ],
      images: [
        {
          fallback_url: "https://media.io/image",
          scrubber_media_url: "https://media.io/image",
          url: "https://media.io/image",
        },
      ],
      other: [
        {
          _fallback_url: "https://media.io/image",
          __scrubber_media___url_: "https://media.io/image",
          _url__: "https://media.io/image",
        },
        {
          API: "test_upper",
          _API_: "test_upper",
          __API__: "test_upper",
          APIResponse: "test_acronym",
          _APIResponse_: "test_acronym",
          __APIResponse__: "test_acronym",
        },
      ],
    });

    const expected = {
      videos: [
        {
          fallbackUrl: "https://media.io/video",
          scrubberMediaUrl: "https://media.io/video",
          dashUrl: "https://media.io/video",
        },
      ],
      images: [
        {
          fallbackUrl: "https://media.io/image",
          scrubberMediaUrl: "https://media.io/image",
          url: "https://media.io/image",
        },
      ],
      other: [
        {
          _fallbackUrl: "https://media.io/image",
          __scrubberMediaUrl_: "https://media.io/image",
          _url__: "https://media.io/image",
        },
        {
          API: "test_upper",
          _API_: "test_upper",
          __API__: "test_upper",
          APIResponse: "test_acronym",
          _APIResponse_: "test_acronym",
          __APIResponse__: "test_acronym",
        },
      ],
    };

    expect(actual).toEqual(expected);
  });
});

describe('separateWords utility', () => {
  test.each([
    // Pascals
    ["HelloWorld", "Hello_World"],
    ["_HelloWorld", "_Hello_World"],
    ["__HelloWorld", "__Hello_World"],
    ["HelloWorld_", "Hello_World_"],
    ["HelloWorld__", "Hello_World__"],
    // Camels
    ["helloWorld", "hello_World"],
    ["_helloWorld", "_hello_World"],
    ["__helloWorld", "__hello_World"],
    ["helloWorld_", "hello_World_"],
    ["helloWorld__", "hello_World__"],
    // Snakes
    ["hello_world", "hello_world"],
    ["_hello_world", "_hello_world"],
    ["__hello_world", "__hello_world"],
    ["hello_world_", "hello_world_"],
    ["hello_world__", "hello_world__"],
    // Fixes issue #128
    ["whatever_hi", "whatever_hi"],
    ["whatever_10", "whatever_10"],
    // Fixes issue #127
    ["sizeX", "size_X"],
    // Fixes issue #168
    ["aB", "a_B"],
    // Fixed issue #201. 2021-10-12
    ["testNTest", "test_N_Test"],
  ])(
    'separateWords("%s") should return "%s"',
    (inputStr, expectedOutput) => {
      const output = humps.separateWords(inputStr);
      expect(output).toBe(expectedOutput);
    }
  );
});

describe('kebabize', () => {
  test.each([
    ["fallback_url", "fallback-url"],
    ["scrubber_media_url", "scrubber-media-url"],
    ["dash_url", "dash-url"],
    ["_fallback_url", "_fallback-url"],
    ["__scrubber_media___url_", "__scrubber-media-url_"],
    ["_url__", "_url__"],
    ["API", "API"],
    ["_API_", "_API_"],
    ["__API__", "__API__"],
    ["API_Response", "API-Response"],
    ["_API_Response_", "_API-Response_"],
    ["__API_Response__", "__API-Response__"],
  ])(
    'kebabize("%s") should return "%s"',
    (inputStr, expectedOutput) => {
      const output = humps.kebabize(inputStr);
      expect(output).toBe(expectedOutput);
    }
  );

  test('should kebabize dict with list of dicts', () => {
    const actual = humps.kebabize({
      videos: [
        {
          fallback_url: "https://media.io/video",
          scrubber_Media_Url: "https://media.io/video",
          dash_Url: "https://media.io/video",
        },
      ],
      images: [
        {
          fallback_url: "https://media.io/image",
          scrubber_Media_Url: "https://media.io/image",
          url: "https://media.io/image",
        },
      ],
      other: [
        {
          _fallback_url: "https://media.io/image",
          __scrubber_Media___Url_: "https://media.io/image",
          _url__: "https://media.io/image",
        },
        {
          API: "test_upper",
          _API_: "test_upper",
          __API__: "test_upper",
          APIResponse: "test_acronym",
          _APIResponse_: "test_acronym",
          __APIResponse__: "test_acronym",
        },
      ],
    });

    const expected = {
      videos: [
        {
          "fallback-url": "https://media.io/video",
          "scrubber-Media-Url": "https://media.io/video",
          "dash-Url": "https://media.io/video",
        },
      ],
      images: [
        {
          "fallback-url": "https://media.io/image",
          "scrubber-Media-Url": "https://media.io/image",
          url: "https://media.io/image",
        },
      ],
      other: [
        {
          "_fallback-url": "https://media.io/image",
          "__scrubber-Media-Url_": "https://media.io/image",
          "_url__": "https://media.io/image",
        },
        {
          API: "test_upper",
          _API_: "test_upper",
          __API__: "test_upper",
          "api-response": "test_acronym",
          "_api-response_": "test_acronym",
          "__api-response__": "test_acronym",
        },
      ],
    };

    expect(actual).toEqual(expected);
  });
});

describe('converting strings', () => {
  test('should convert between different cases', () => {
    expect(humps.camelize("jack_in_the_box")).toBe("jackInTheBox");
    expect(humps.decamelize("rubyTuesdays")).toBe("ruby_tuesdays");
    expect(humps.depascalize("UnosPizza")).toBe("unos_pizza");
    expect(humps.pascalize("red_robin")).toBe("RedRobin");
    expect(humps.kebabize("white_castle")).toBe("white-castle");
    expect(humps.dekebabize("taco-bell")).toBe("taco_bell");
  });
});

describe('camelized acronyms', () => {
  test.each([
    ["PERatio", "pe_ratio"],
    ["HTTPResponse", "http_response"],
    ["_HTTPResponse", "_http_response"],
    ["_HTTPResponse__", "_http_response__"],
    ["BIP73", "BIP73"],
    ["BIP72b", "bip72b"],
    ["memMB", "mem_mb"],
    // Fixed issue #258
    ["B52Thing", "b52_thing"],
    ["B2BThing", "b2b_thing"]

  ])(
    'decamelize("%s") should handle acronyms and return "%s"',
    (inputStr, expectedOutput) => {
      expect(humps.decamelize(inputStr)).toBe(expectedOutput);
    }
  );
});

describe('conditionals', () => {
  test('should correctly identify PascalCase', () => {
    expect(humps.isPascalCase("RedRobin")).toBe(true);
    expect(humps.isSnakeCase("RedRobin")).toBe(false);
    expect(humps.isCamelCase("RedRobin")).toBe(false);
    expect(humps.isKebabCase("RedRobin")).toBe(false);
  });

  test('should correctly identify snake_case', () => {
    expect(humps.isSnakeCase("ruby_tuesdays")).toBe(true);
    expect(humps.isCamelCase("ruby_tuesdays")).toBe(false);
    expect(humps.isPascalCase("ruby_tuesdays")).toBe(false);
    expect(humps.isKebabCase("ruby_tuesdays")).toBe(false);
  });

  test('should correctly identify camelCase', () => {
    expect(humps.isCamelCase("jackInTheBox")).toBe(true);
    expect(humps.isSnakeCase("jackInTheBox")).toBe(false);
    expect(humps.isPascalCase("jackInTheBox")).toBe(false);
    expect(humps.isKebabCase("jackInTheBox")).toBe(false);
  });

  test('should correctly identify kebab-case', () => {
    expect(humps.isKebabCase("white-castle")).toBe(true);
    expect(humps.isSnakeCase("white-castle")).toBe(false);
    expect(humps.isCamelCase("white-castle")).toBe(false);
    expect(humps.isPascalCase("white-castle")).toBe(false);
  });

  test('should handle all-caps strings', () => {
    expect(humps.isCamelCase("API")).toBe(true);
    expect(humps.isPascalCase("API")).toBe(true);
    expect(humps.isSnakeCase("API")).toBe(true);
    expect(humps.isKebabCase("API")).toBe(true);
  });

  test('should handle strings with numbers', () => {
    // Fixed issue #128
    expect(humps.isSnakeCase("whatever_10")).toBe(true);
    expect(humps.isCamelCase("whatever_10")).toBe(false);
    expect(humps.isPascalCase("whatever_10")).toBe(false);
    expect(humps.isKebabCase("whatever_10")).toBe(false);
  });
});

describe('numeric inputs', () => {
  test('should handle numeric inputs', () => {
    expect(humps.camelize(1234)).toBe(1234);
    expect(humps.decamelize(123)).toBe(123);
    expect(humps.pascalize(123)).toBe(123);
    expect(humps.kebabize(123)).toBe(123);
  });
});

describe('upper case strings', () => {
  test('should handle all-caps strings', () => {
    expect(humps.camelize("API")).toBe("API");
    expect(humps.decamelize("API")).toBe("API");
    expect(humps.pascalize("API")).toBe("API");
    expect(humps.depascalize("API")).toBe("API");
    expect(humps.kebabize("API")).toBe("API");
    expect(humps.dekebabize("API")).toBe("API");
  });
});

describe('pascalize', () => {
  test.each([
    ["fallback_url", "FallbackUrl"],
    ["scrubber_media_url", "ScrubberMediaUrl"],
    ["dash_url", "DashUrl"],
    ["_fallback_url", "_FallbackUrl"],
    ["__scrubber_media___url_", "__ScrubberMediaUrl_"],
    ["_url__", "_Url__"],
    ["API", "API"],
    ["_API_", "_API_"],
    ["__API__", "__API__"],
    ["APIResponse", "APIResponse"],
    ["_APIResponse_", "_APIResponse_"],
    ["__APIResponse__", "__APIResponse__"],
    // Fixed issue # 256
    ["", ""],
    [null, ""],
  ])(
    'pascalize("%s") should return "%s"',
    (inputStr, expectedOutput) => {
      const output = humps.pascalize(inputStr as string);
      expect(output).toBe(expectedOutput);
    }
  );

  test('should pascalize object with nested arrays', () => {
    const actual = humps.pascalize({
      videos: [
        {
          fallback_url: "https://media.io/video",
          scrubber_media_url: "https://media.io/video",
          dash_url: "https://media.io/video",
        },
      ],
      images: [
        {
          fallback_url: "https://media.io/image",
          scrubber_media_url: "https://media.io/image",
          url: "https://media.io/image",
        },
      ],
      other: [
        {
          _fallback_url: "https://media.io/image",
          __scrubber_media___url_: "https://media.io/image",
          _url__: "https://media.io/image",
        },
        {
          API: "test_upper",
          _API_: "test_upper",
          __API__: "test_upper",
          APIResponse: "test_acronym",
          _APIResponse_: "test_acronym",
          __APIResponse__: "test_acronym",
        },
      ],
    });

    const expected = {
      Videos: [
        {
          FallbackUrl: "https://media.io/video",
          ScrubberMediaUrl: "https://media.io/video",
          DashUrl: "https://media.io/video",
        },
      ],
      Images: [
        {
          FallbackUrl: "https://media.io/image",
          ScrubberMediaUrl: "https://media.io/image",
          Url: "https://media.io/image",
        },
      ],
      Other: [
        {
          _FallbackUrl: "https://media.io/image",
          __ScrubberMediaUrl_: "https://media.io/image",
          _Url__: "https://media.io/image",
        },
        {
          API: "test_upper",
          _API_: "test_upper",
          __API__: "test_upper",
          APIResponse: "test_acronym",
          _APIResponse_: "test_acronym",
          __APIResponse__: "test_acronym",
        },
      ],
    };

    expect(actual).toEqual(expected);
  });
});

describe('depascalize', () => {
  test('should depascalize array of objects', () => {
    const actual = humps.depascalize([
      {
        Symbol: "AAL",
        LastPrice: 31.78,
        ChangePct: 2.8146,
        ImpliedVolatality: 0.482,
      },
      {
        Symbol: "LBTYA",
        LastPrice: 25.95,
        ChangePct: 2.6503,
        ImpliedVolatality: 0.7287,
      },
      {
        _Symbol: "LBTYK",
        ChangePct_: 2.5827,
        _LastPrice__: 25.42,
        __ImpliedVolatality_: 0.4454,
      },
      {
        API: "test_upper",
        _API_: "test_upper",
        __API__: "test_upper",
        APIResponse: "test_acronym",
        _APIResponse_: "test_acronym",
        __APIResponse__: "test_acronym",
        ruby_tuesdays: "ruby_tuesdays",
      },
    ]);

    const expected = [
      {
        symbol: "AAL",
        last_price: 31.78,
        change_pct: 2.8146,
        implied_volatality: 0.482,
      },
      {
        symbol: "LBTYA",
        last_price: 25.95,
        change_pct: 2.6503,
        implied_volatality: 0.7287,
      },
      {
        _symbol: "LBTYK",
        change_pct_: 2.5827,
        _last_price__: 25.42,
        __implied_volatality_: 0.4454,
      },
      {
        API: "test_upper",
        _API_: "test_upper",
        __API__: "test_upper",
        api_response: "test_acronym",
        _api_response_: "test_acronym",
        __api_response__: "test_acronym",
        ruby_tuesdays: "ruby_tuesdays",
      },
    ];

    expect(actual).toEqual(expected);
  });
});

describe('dekebabize', () => {
  test.each([
    ["symbol", "symbol"],
    ["last-price", "last_price"],
    ["Change-Pct", "Change_Pct"],
    ["implied-Volatility", "implied_Volatility"],
    ["_symbol", "_symbol"],
    ["change-pct_", "change_pct_"],
    ["_last-price__", "_last_price__"],
    ["__implied-volatility_", "__implied_volatility_"],
    ["API", "API"],
    ["_API_", "_API_"],
    ["__API__", "__API__"],
    ["API-Response", "API_Response"],
    ["_API-Response_", "_API_Response_"],
    ["__API-Response__", "__API_Response__"],
    ["12345", "12345"],
  ])(
    'dekebabize("%s") should return "%s"',
    (inputStr, expectedOutput) => {
      const output = humps.dekebabize(inputStr);
      expect(output).toBe(expectedOutput);
    }
  );

  test('should dekebabize list of dicts', () => {
    const actual = humps.dekebabize([
      {
        symbol: "AAL",
        "last-price": 31.78,
        "Change-Pct": 2.8146,
        "implied-Volatility": 0.482,
      },
      {
        symbol: "LBTYA",
        "last-price": 25.95,
        "Change-Pct": 2.6503,
        "implied-Volatility": 0.7287,
      },
      {
        _symbol: "LBTYK",
        "Change-Pct_": 2.5827,
        "_last-price__": 25.42,
        "__implied-Volatility_": 0.4454,
      },
      {
        API: "test_upper",
        _API_: "test_upper",
        __API__: "test_upper",
        "API-Response": "test_acronym",
        "_API-Response_": "test_acronym",
        "__API-Response__": "test_acronym",
        ruby_tuesdays: "ruby_tuesdays",
        "_item-ID": "_item_id",
      },
    ]);

    const expected = [
      {
        symbol: "AAL",
        last_price: 31.78,
        Change_Pct: 2.8146,
        implied_Volatility: 0.482,
      },
      {
        symbol: "LBTYA",
        last_price: 25.95,
        Change_Pct: 2.6503,
        implied_Volatility: 0.7287,
      },
      {
        _symbol: "LBTYK",
        Change_Pct_: 2.5827,
        _last_price__: 25.42,
        __implied_Volatility_: 0.4454,
      },
      {
        API: "test_upper",
        _API_: "test_upper",
        __API__: "test_upper",
        API_Response: "test_acronym",
        _API_Response_: "test_acronym",
        __API_Response__: "test_acronym",
        ruby_tuesdays: "ruby_tuesdays",
        _item_ID: "_item_id",
      },
    ];

    expect(actual).toEqual(expected);
  });
});

describe('decamelize', () => {
  test.each([
    ["symbol", "symbol"],
    ["lastPrice", "last_price"],
    ["changePct", "change_pct"],
    ["impliedVolatility", "implied_volatility"],
    ["_symbol", "_symbol"],
    ["changePct_", "change_pct_"],
    ["_lastPrice__", "_last_price__"],
    ["__impliedVolatility_", "__implied_volatility_"],
    ["API", "API"],
    ["_API_", "_API_"],
    ["__API__", "__API__"],
    ["APIResponse", "api_response"],
    ["_APIResponse_", "_api_response_"],
    ["__APIResponse__", "__api_response__"],
    // Fixed issue #2. 2021-05-01
    ["_itemID", "_item_id"],
    // Fixed issue #4. 2021-05-01
    ["memMB", "mem_mb"],
    // Fixed issue #127. 2021-09-13
    ["sizeX", "size_x"],
    // Fixed issue #168. 2021-09-13
    ["aB", "a_b"],
    // Fixed issue #201. 2021-10-12
    ["testNTest", "test_n_test"],
  ])(
    'decamelize("%s") should return "%s"',
    (inputStr, expectedOutput) => {
      const output = humps.decamelize(inputStr);
      expect(output).toBe(expectedOutput);
    }
  );

  test('should decamelize list of dicts', () => {
    const actual = humps.decamelize([
      {
        symbol: "AAL",
        lastPrice: 31.78,
        changePct: 2.8146,
        impliedVolatility: 0.482,
      },
      {
        symbol: "LBTYA",
        lastPrice: 25.95,
        changePct: 2.6503,
        impliedVolatility: 0.7287,
      },
      {
        _symbol: "LBTYK",
        changePct_: 2.5827,
        _lastPrice__: 25.42,
        __impliedVolatility_: 0.4454,
      },
      {
        API: "test_upper",
        _API_: "test_upper",
        __API__: "test_upper",
        APIResponse: "test_acronym",
        _APIResponse_: "test_acronym",
        __APIResponse__: "test_acronym",
        ruby_tuesdays: "ruby_tuesdays",
        _itemID: "_item_id",
      },
    ]);

    const expected = [
      {
        symbol: "AAL",
        last_price: 31.78,
        change_pct: 2.8146,
        implied_volatility: 0.482,
      },
      {
        symbol: "LBTYA",
        last_price: 25.95,
        change_pct: 2.6503,
        implied_volatility: 0.7287,
      },
      {
        _symbol: "LBTYK",
        change_pct_: 2.5827,
        _last_price__: 25.42,
        __implied_volatility_: 0.4454,
      },
      {
        API: "test_upper",
        _API_: "test_upper",
        __API__: "test_upper",
        api_response: "test_acronym",
        _api_response_: "test_acronym",
        __api_response__: "test_acronym",
        ruby_tuesdays: "ruby_tuesdays",
        _item_id: "_item_id",
      },
    ];

    expect(actual).toEqual(expected);
  });
});
