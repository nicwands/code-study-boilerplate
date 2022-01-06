import tempfile
import hwebserver
import hou
import random
import json

def render_rock(noise_offset):
    try:
        hou.hipFile.load("/home/nicwands/Documents/CTHDRL/code-study-boilerplate/server/projects")
    except (hou.LoadWarning):
        print("warning")

    nodeRender = hou.node("/out/mantra1")
    nodeMountain = hou.node("/obj/BOX/mountain1")
    nodeRockColor = hou.node("/obj/BOX/attribnoise1")
    nodeScatter = hou.node("/obj/BOX/scatter1")
    nodeTreeColor = hou.node("/obj/BOX/color_noise")

    for i in range(1, 2):
        print(f"Starting render #{i}")

        # Mountain noise
        nodeMountain.parm("offset").set(noise_offset)
        nodeMountain.parm("elementsize").set(random.random() + 1)

        # Rock color
        nodeRockColor.parm("offset").set(random.random() * 50)
        nodeRockColor.parm("amplitude").set(random.random() * 10)
        nodeRockColor.parm("elementsize").set(random.random() * 9 + 1)

        # Scatter
        nodeScatter.parm("densityscale").set(random.random() * 2000 + 1000)

        # Tree color
        nodeTreeColor.parm("offset").set(random.random() * 50)
        nodeTreeColor.parm("amplitude").set(random.random() * 10)
        nodeTreeColor.parm("elementsize").set(random.random() * 9 + 1)

        temp_output_file = tempfile.mkstemp(".jpg")[1]
        nodeRender.render(output_file=temp_output_file)

        return temp_output_file

@hwebserver.urlHandler("/render")
def blur_image(request):
    if request.method() == "GET":
        return hwebserver.Response('''
            <p>Upload an image</p>
            <form method="POST" enctype="multipart/form-data">
                <input type="range" min="0" max="50" name="noise_offset">
                <input type="submit">
            </form>
        ''')

    if request.method() != "POST":
        return hwebserver.notFoundResponse(request)

    req_body = json.loads(request.body())

    render = render_rock(req_body["noise_offset"])
    print('rendered', render)

    return hwebserver.fileResponse(render, delete_file=True)

    # image_file = request.files().get("image_file")
    # if image_file is None:
    #     return hwebserver.errorResponse(request, "No image was posted", 422)
    # image_file.saveToDisk()

    # # Use a COP network to load the image, blur it, and write it to a
    # # temporary output file.
    # copnet = hou.node("/img").createNode("img")
    # file_cop = copnet.createNode("file")
    # file_cop.parm("filename1").set(image_file.temporaryFilePath())

    # blur_cop = copnet.createNode("blur")
    # blur_cop.setFirstInput(file_cop)
    # blur_cop.parm("blursize").set(10)

    # rop = copnet.createNode("rop_comp")
    # rop.setFirstInput(blur_cop)
    # rop.parmTuple("f").set((1, 1, 1))
    # temp_output_file = tempfile.mkstemp(".jpg")[1]
    # rop.parm("copoutput").set(temp_output_file)
    # rop.render()

    # copnet.destroy()

    # return hwebserver.fileResponse(temp_output_file, delete_file=True)


hwebserver.run(8008, True)
