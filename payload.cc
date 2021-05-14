#if !defined(__clang__)
#	error "WASM32 platform only supported when compiling via Clang"
#endif

#define WASM_EXPORT(_name) extern "C" __attribute__((used,export_name(_name)))

WASM_EXPORT("meaning_of_life") __INT32_TYPE__ meaning_of_life() {
	return 42;
}
