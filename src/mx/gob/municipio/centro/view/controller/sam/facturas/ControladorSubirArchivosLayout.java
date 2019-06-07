package mx.gob.municipio.centro.view.controller.sam.facturas;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import jxl.read.biff.BiffException;
import mx.gob.municipio.centro.model.gateways.sam.GatewayFacturas;
import mx.gob.municipio.centro.view.bases.ControladorBase;

@Controller
@RequestMapping("/sam/facturas/_subirArchivoNominaDeductivas2.action")
public class ControladorSubirArchivosLayout extends ControladorBase {

	@Autowired 
	GatewayFacturas gatewayFacturas;
	
	@Autowired
	ServletContext context;
	
	public ControladorSubirArchivosLayout(){}
	private static final String FILE_NAME = "/tmp/MyFirstExcel.xlsx";
	
	/*Metodo para la carga de archivo*/
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.POST})  
	public String requestPostControlador(Map modelo, HttpServletRequest request, HttpServletResponse response, @RequestParam("fileNomina") MultipartFile fileNomina) throws IOException, BiffException  {
		
		Gson gson = new Gson();
		Map m = new HashMap();
		Date fecha = new Date();
		String json = "";
		String path = request.getSession().getServletContext().getRealPath("")+"/sam/facturas/nomina/";	 
	  	//guarda el archivo en registro
	  	Integer idArchivo = fecha.getDay();
	  	Integer mes = fecha.getMonth()+1;
	  	Integer anio = fecha.getYear();
	  	
	  	String nombreArchivo = removeSpecialChar(fileNomina.getOriginalFilename());
	  	String nombreFisico = "["+idArchivo.toString()+"_"+mes+"_"+anio+"] "+nombreArchivo;
	  	String rutaCompleta = path + nombreFisico;
	  	almacenarArchivoFisico(fileNomina,path,nombreFisico);
	  	
	  	Vector cellVectorHolder = new Vector();
	  	

	  	try {
	  		
	  	  InputStream ExcelFileToRead = new FileInputStream(rutaCompleta);
	      XSSFWorkbook wb = new XSSFWorkbook(ExcelFileToRead);
	      
	  		FileInputStream excelFile = new FileInputStream(new File(FILE_NAME));
	  		// Creating a Workbook from an Excel file (.xls or .xlsx)
	        Workbook workbook = WorkbookFactory.create(new File(FILE_NAME));
            
            
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();

            while (iterator.hasNext()) {

                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();

                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();
                    //getCellTypeEnum shown as deprecated for version 3.15
                    //getCellTypeEnum ill be renamed to getCellType starting from version 4.0
                    if (currentCell.getCellTypeEnum() == CellType.STRING) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                    } else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                    }

                }
                System.out.println();
            }
		} catch (Exception e) {
			
			m.put("mensaje", false);
	  	  	json = gson.toJson(m);
	  	  	modelo.put("mensaje", json);
	  		e.printStackTrace(); 
		}
		return "sam/facturas/_subirArchivoNominaDeductivas.jsp2";
		
	}
	private static void printCellValue(Cell cell) {
	    switch (cell.getCellTypeEnum()) {
	        case BOOLEAN:
	            System.out.print(cell.getBooleanCellValue());
	            break;
	        case STRING:
	            System.out.print(cell.getRichStringCellValue().getString());
	            break;
	        case NUMERIC:
	            if (DateUtil.isCellDateFormatted(cell)) {
	                System.out.print(cell.getDateCellValue());
	            } else {
	                System.out.print(cell.getNumericCellValue());
	            }
	            break;
	        case FORMULA:
	            System.out.print(cell.getCellFormula());
	            break;
	        case BLANK:
	            System.out.print("");
	            break;
	        default:
	            System.out.print("");
	    }

	    System.out.print("\t");
	}
}
